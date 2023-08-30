export const customDate = (date:string | undefined) => {
    if(date == undefined){
      return
    }
    const newDate = new Date(date)
      const day = newDate.getDate();
    const month = newDate.toLocaleString('default', { month: 'long' });
    const year = newDate.getFullYear();
   
  
    return `${day} de ${month} del ${year}`;
  }
  
  export const customHour = (date:string | undefined) => {
    if(date == undefined){
      return
    }
    const newDate = new Date(date)
  
    const hour = newDate.getHours();
    const minutes = newDate.getMinutes();
    const seconds = newDate.getSeconds();
  
    return  `a las ${hour} horas con ${minutes}  minutos y ${seconds} segundos`
  }