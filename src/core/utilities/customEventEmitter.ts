export function emitCustomEvent(eventName: string, payload: any) {
    const event = new CustomEvent(eventName, { detail: payload });
    document.dispatchEvent(event);
}