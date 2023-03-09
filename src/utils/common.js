export const FormatPlayCount = (count) => {
    if (count > 100000000) {
        return `${Math.floor((count / 100000000) * 100) / 100}亿`;
    }
    if (count > 100000) {
        return `${Math.floor((count / 10000) * 10) / 10}万`;
    }
    if (count > 10000) {
        return `${Math.floor((count / 10000) * 100) / 100}万`;
    }
    return count;
}

export const FormatDate = (timestamp, format = 'yyyy-MM-dd') => {
    const dt = new Date(timestamp)
    const opt = {
        yyyy: dt.getFullYear(),
        MM: (dt.getMonth() + 1 + '').padStart(2, '0'),
        dd: (dt.getDate() + '').padStart(2, '0'),
        HH: (dt.getHours() + '').padStart(2, '0'),
        mm: (dt.getMinutes() + '').padStart(2, '0'),
        ss: (dt.getSeconds() + '').padStart(2, '0')
    }

    for (const k in opt) {
        const ret = new RegExp('(' + k + ')').exec(format)
        if (ret) {
            format = format.replace(ret[1], opt[k])
        }
    }

    return format
}

export const FormatSongTime = (duration = 0) => {
    duration = duration >= 0 ? duration / 1000 : 0;
    const m = (Math.floor(duration / 60) + '').padStart(2, '0')
    const s = (Math.floor(duration % 60) + '').padStart(2, '0')
    return `${m}:${s}`
}

export const FormatTrackTime = (value) => {
    if (!value) return '';
    let min = ~~((value / 60) % 60);
    let sec = (~~(value % 60)).toString().padStart(2, '0');
    return `${min}:${sec}`;
}

export const GetRandomInt = (min, max) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}