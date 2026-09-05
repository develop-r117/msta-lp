import AppKit
import Foundation
import Vision

struct Box: Encodable {
  let text: String
  let x: Double
  let y: Double
  let w: Double
  let h: Double
}

struct FileResult: Encodable {
  let file: String
  let width: Int
  let height: Int
  let boxes: [Box]
}

let args = CommandLine.arguments.dropFirst()
guard let dir = args.first else {
  fputs("usage: ocr-help-screenshots.swift <dir>\n", stderr)
  exit(1)
}

let fm = FileManager.default
let urls = (try? fm.contentsOfDirectory(at: URL(fileURLWithPath: dir), includingPropertiesForKeys: nil))?
  .filter { ["png", "jpg", "jpeg", "webp"].contains($0.pathExtension.lowercased()) }
  .sorted { $0.lastPathComponent < $1.lastPathComponent } ?? []

var results: [FileResult] = []

for url in urls {
  guard let nsImage = NSImage(contentsOf: url),
        let tiff = nsImage.tiffRepresentation,
        let rep = NSBitmapImageRep(data: tiff),
        let cg = rep.cgImage
  else { continue }

  let width = cg.width
  let height = cg.height
  let request = VNRecognizeTextRequest()
  request.recognitionLevel = .accurate
  request.recognitionLanguages = ["ja-JP", "en-US"]
  request.usesLanguageCorrection = false

  let handler = VNImageRequestHandler(cgImage: cg, options: [:])
  do {
    try handler.perform([request])
  } catch {
    continue
  }

  var boxes: [Box] = []
  for observation in request.results ?? [] {
    guard let candidate = observation.topCandidates(1).first else { continue }
    let r = observation.boundingBox
    boxes.append(
      Box(
        text: candidate.string,
        x: r.origin.x * Double(width),
        y: (1 - r.origin.y - r.height) * Double(height),
        w: r.width * Double(width),
        h: r.height * Double(height)
      )
    )
  }
  results.append(
    FileResult(file: url.lastPathComponent, width: width, height: height, boxes: boxes)
  )
}

let encoder = JSONEncoder()
encoder.outputFormatting = [.prettyPrinted, .sortedKeys]
print(String(data: try encoder.encode(results), encoding: .utf8)!)
