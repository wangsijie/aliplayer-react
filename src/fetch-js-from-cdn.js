export default function fetchJsFromCDN (src, externals = []) {
    return new Promise((resolve, reject) => {
        const script = document.createElement('script')
        script.setAttribute('src', src)
        script.addEventListener('load', () => {
            resolve(externals.map(key => {
                const ext = window[key]
                typeof ext === 'undefined' && console.warn(`No external named '${key}' in window`)
                return ext
            }))
        })
        script.addEventListener('error', reject)
        document.body.appendChild(script)
    });
}
