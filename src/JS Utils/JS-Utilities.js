export const nonMilitary = time => {
    let hour = Number(time.slice(0,2))

    if(hour > 12) {
        return `${hour-12}${time.slice(2)} PM`
    } else {
        if(hour > 0 && hour < 12) {
            return `${hour.toString()}${time.slice(2)} AM`
        } else if(hour === 0) {
            return `12${time.slice(2)} AM`
        } else {
            return `${time} PM`
        }
        
    }
}