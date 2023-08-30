export const getUserLocation = async(): Promise<[number, number]> => {
    return new Promise((res, rej) => {
        navigator.geolocation.watchPosition(
            ({coords}) => {
                res([coords.longitude, coords.latitude])
            },
            (err) => {
                alert('no se pudo obtener la geolocalizacion')
                console.error(err)
                rej()
            }
        )
    });
}