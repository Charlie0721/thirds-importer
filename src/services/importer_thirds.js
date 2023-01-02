import axios from './axios';

export class ThirdPartyImporter{


    static deleteThird=async()=> await axios.delete('/remove-thirds');
    
    static sendData=async(data)=> await axios.post('/',data);


}
