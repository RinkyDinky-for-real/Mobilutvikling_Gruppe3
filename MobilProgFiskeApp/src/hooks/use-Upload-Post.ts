import { sendRequest } from '../databaseAPI'


export async function UploadPost( userid: string, title: string, content: string, latitude: number, longitude: number, date: string) {
    
    try{
        console.log('uploading post')
        const response = await sendRequest("post", "POST", { userid, title, content, latitude: String(latitude), longitude: String(longitude), date,});
    if (!response.ok) {
  const details = await response.text();
  throw new Error(
    `Upload failed: ${response.status} ${response.statusText}. ${details}`
  );
}
    return response;
    } catch (error) {
    console.error('Upload failed', error)
    throw error
    }
}
