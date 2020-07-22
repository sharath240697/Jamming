let Spotify = {
    async getAccessToken()
    {
        if(window.location.href.match(/\#(?:access_token\=)([\S\s]*?)\&/) === null)
        {
            console.log(window.location.href.match(/\#(?:access_token\=)([\S\s]*?)\&/) === null);
            let client_id = '&client_id=9be9bce64abc49499a251c74c2837e00';
            let redirect_uri = '&redirect_uri=http://localhost:3000';
            let response_type = 'response_type=token';
            let url = 'https://accounts.spotify.com/authorize?'+response_type+client_id+redirect_uri;
            window.location.replace(url);
        }
        else
        {
            
         return window.location.href.match(/\#(?:access_token\=)([\S\s]*?)\&/)[1]; 
        }
    },
    checkexpirytoken()
    {
        var currenturl = new URLSearchParams(window.location.href);
        
        console.log(currenturl.get("expires_in"));

    },
    async search(term)
    { 
            let access_token= await this.getAccessToken().then(resolvedValue => {
                return resolvedValue}).catch(()=> {console.log("ctach errorrrr")});
            const searchUrl = "https://api.spotify.com/v1/search?type=track&q="+term;
            try {
                console.log(access_token+" state of act");
                let header = {headers: {authorization: 'Bearer ' + access_token}};
                console.log(header); 
                const response = await fetch(searchUrl,header);
                
                console.log(" "+response.ok+"  "+term+"  "+searchUrl);
            if(response.ok)
            {
                var jsonResponse = await response.json();
                console.log(JSON.stringify(jsonResponse));
                //throw new Error('Request failed');
            }
            } catch (error) {
                console.log(error);
            }

    }
};



export default Spotify;


