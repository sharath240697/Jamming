
  let Spotify = {
    async getAccessToken()
    {
        if(window.location.href.match(/\#(?:access_token\=)([\S\s]*?)\&/) === null)
        {
            console.log(window.location.href.match(/\#(?:access_token\=)([\S\s]*?)\&/) === null);
            let client_id = '&client_id=9be9bce64abc49499a251c74c2837e00';
            let redirect_uri = '&redirect_uri=https://makemyapp.surge.sh';   //http://localhost:3000
            let scope = '&scope=playlist-modify-public%20playlist-modify-private';
            let response_type = 'response_type=token';
            console.log(url);
            let url = 'https://accounts.spotify.com/authorize?'+response_type+client_id+scope+redirect_uri;
            console.log(url);

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
                const response = await fetch(searchUrl,{ headers : { Authorization: 'Bearer '+access_token}});
            if(response.ok)
            {
                var jsonResponse = await response.json();
                console.log(JSON.stringify(jsonResponse));
                let list = jsonResponse.tracks.items.map(track => {
                    return {id:track.id,name:track.name,artist:track.artists[0].name,album:track.album.name,uri:track.uri};
                });
               // console.log(list);
               list.map(track => console.log(track.name));
                return list;
            }
            else
            {
                throw new Error('Request failed');
            }
            } catch (error) {
                console.log(error);
            }

    },

    async savePlaylist(playlistname,trakUris,resetPlaylist)
    {
        console.log(trakUris.length);
        if(typeof playlistname === "undefined" || typeof trakUris === "undefined" || trakUris === null)
            return;
        let urlForUserId = "https://api.spotify.com/v1/me";
        let access_token = await this.getAccessToken().then(resolvedValue => {return resolvedValue}).catch(()=> {console.log("ctach errorrrr")});
        let header = { headers: { Authorization: 'Bearer '+access_token}};
        let userId;
        try 
        {
            const response = await fetch(urlForUserId,header); console.log(response.ok);
            if(response.ok)
            {
                let jsonResponse = await response.json();
                console.log(JSON.stringify(jsonResponse));
                userId = jsonResponse.id;
                console.log(userId);
                let urlForPlaylistCreation = "https://api.spotify.com/v1/users/"+userId+"/playlists";
                console.log(urlForPlaylistCreation);
                const playlistCreationResponse = await fetch(urlForPlaylistCreation,{  
                                                                                        method: "POST",
                                                                                        body: JSON.stringify({name: playlistname}) ,
                                                                                      headers: {Authorization: 'Bearer '+access_token,'Content-Type':'application/json' }
                                                                                    }
                                                            );
                                                            
                console.log(playlistCreationResponse.ok)
                if(playlistCreationResponse.ok)
                {
                    let jsonResponseForPlaylistCreation = await playlistCreationResponse.json();
                    console.log(jsonResponseForPlaylistCreation);
                    let playlistId = jsonResponseForPlaylistCreation.id;
                    let trackAddUrl = urlForPlaylistCreation+"/"+playlistId+"/tracks";
                    console.log(trakUris);
                    const response2 = await fetch(trackAddUrl,{
                                                                method: "POST",
                                                                body: JSON.stringify({uris: trakUris}),
                                                                headers: {Authorization: 'Bearer '+access_token,'Content-Type':'application/json' }});
                    console.log(response2.ok);
                    if(response2.ok)
                    {
                        let trackJson = await response2.json();
                        console.log(JSON.stringify(trackJson));
                        resetPlaylist();
                    }
                }
            }  
        } catch (error) 
        {
            console.log(error);
        }

    }
};
export default Spotify;


