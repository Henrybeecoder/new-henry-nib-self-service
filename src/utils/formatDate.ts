export const formatBVNDate = (date:any) => {
        let a = date.split('-')
        let year = a[2]
        if(year > 20){
            year = `19${year}`
        }
        else{
            year = `20${year}`
        }

        let month = a[1]
        switch(month) {
            case 'January':
                month = '01'
              break;
            case 'February':
                month = '02'
              break;
            case 'March':
                month = '03'
              break;
            case 'April':
                month = '04'
              break;
            case 'May':
                month = '05'
              break;
            case 'June':
                month = '06'
              break;
            case 'July':
                month = '07'
              break;
            case 'August':
                month = '08'
              break;
            case 'September':
                month = '09'
              break;
            case 'October':
                month = '10'
              break;
            case 'November':
                month = '11'
              break;
            case 'December':
                month = '12'
              break;
            
            default:
              // code block
          }
        let formattedDate = `${year}-${month}-${a[0]}`
        return formattedDate
}