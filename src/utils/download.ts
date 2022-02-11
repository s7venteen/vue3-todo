export default function download<Content extends BlobPart>(content: Content, filename: string) {
  const a = document.createElement('a')
  a.download = filename
  a.style.display = 'none'
  const blob = new Blob([content])
  a.href = URL.createObjectURL(blob)
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}