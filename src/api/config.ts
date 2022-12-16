export const web = {
    localStorage: () => localStorage.getItem('token'),
    setting: (token: string) => {
        if (window.location.hostname.includes('sandworks.co.kr') && window.location.protocol.includes('https')) {
            localStorage.removeItem('token');
        } else {
            localStorage.setItem('token', token);
        }
    },
};
