const formatDateTimes = (value, type) => {
    const dates = new Date(value * 1000)
    var months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ]
    let tanggal = dates.getDate()
    let bulan = dates.getMonth()
    let bulanAbjad = months[dates.getMonth()]
    let tahun = dates.getFullYear()
    let jam = dates.getHours()
    let menit = dates.getMinutes()
    let formatedTime = `${jam}.${menit}`
    let fullFormatDate = `${tanggal} ${bulanAbjad} ${tahun} ${jam}.${menit}`
    let formatedDate = `${tanggal}/${bulan}/${tahun}`
    return type === 'date'
        ? formatedDate
        : type === 'datefull'
        ? fullFormatDate
        : formatedTime
}

export default formatDateTimes
