export function postYouTubeCommand(
  iframe: HTMLIFrameElement,
  func: string,
  args: unknown[] = [],
) {
  iframe.contentWindow?.postMessage(
    JSON.stringify({ event: 'command', func, args }),
    '*',
  );
}
