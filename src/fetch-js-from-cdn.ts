declare global {
    interface Window { [key: string]: any; }
}

const cachedSources: string[] = [];

export default function fetchJsFromCDN(src: string, globalName: string): Promise<any> {
    if (!cachedSources.includes(src)) {
        cachedSources.push(src);
    } else {
        return new Promise((resolve) => {
            const check = () => {
                if (window[globalName]) {
                    resolve(window[globalName]);
                } else {
                    setTimeout(check, 100);
                }
            }
            check();
        })
    }
    return new Promise((resolve, reject) => {
        const script = document.createElement('script');
        script.setAttribute('src', src);
        script.addEventListener('load', () => {
            const ext = window[globalName];
            typeof ext === 'undefined' && console.warn(`No external named '${globalName}' in window`);
            resolve(ext);
        })
        script.addEventListener('error', reject);
        document.body.appendChild(script);
    });
}
