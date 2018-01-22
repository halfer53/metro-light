


function getGithubStars(user, limit, callback){
    var thresh = 1
    var per_page = 100
    var page = 1
    var repos = []
    var res_count = 0
    var github_url = 'https://api.github.com/graphql'
    var query =  'query{\
        user(login: "' + user + '") {\
          name\
           repositories(first: 100, privacy: PUBLIC) {\
             nodes {\
                   name\
                   url\
                    stargazers(){\
                        totalCount\
                    }\
                    primaryLanguage(){\
                              name\
                    }\
                    description\
             }\
                totalCount\
           }\
         }\
      }'
      
    var script = document.createElement('script');
    script.onload = function () {
        graphql_request( github_url ,query,  handlecb)
    };
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/crypto-js/3.1.2/rollups/aes.js';
    document.head.appendChild(script); //or something of the likes    


    function handlecb(res){
        if (!res) {
            console.error(res)
            return
        }
        res_count = res.length
        repos = repos.concat(res)

        if(res_count == per_page){
            graphql_request(github_url, query, handlecb)
        }else{
            output(repos)
        }
    }

    function geturl(user, i){
        return 'https://api.github.com' + '/users/' + user + '/repos?per_page=' + per_page + '&page=' + i.toString()
    }

    function graphql_request (url, query, cb) {
        var body = ''
        var result = ''
        // graph(`query :{ user(login: "halfer53") {name} }`, {declare: true})
        // .then(function(data){
        //     data = data['data']
        //     console.log(data)
        //     cb(data)
        // })
        // .catch(function(err){
        //     console.error(err)
        // })
        var hash = "U2FsdGVkX1/3DgXzNVOgXNsLEyqnXL8BWUmnQOvgRGNL64TylyuX3RAZKQOq79YSzRCTpU8FoW+pak2+E9y7dA=="
        var decipher = CryptoJS.AES.decrypt(hash, user)
        var text = decipher.toString(CryptoJS.enc.Utf8)
        $.when( $.ajax({
            url: url,
            data: JSON.stringify({"query":query,"variables":"{}"}),
            headers: {
                Authorization: "Bearer " + text
              },
            contentType: "application/json",
            method: "POST",
            async: true,
            dataType: "json",
        })).then(function(raw_data, textStatus, jqXHR){
            data = raw_data['data']
            if(!data){
                error = raw_data['errors'][0]
                console.error(error.message)
            }
            cb(data)
        }, function(data, textStatus, jqXHR){
            console.log(textStatus, data)
        })
    }
    
    function output (graphql_raw_res) {
        var total = 0,
            longest = 0,
            repos = graphql_raw_res[0].user.repositories.nodes
            console.log(graphql_raw_res[0].user.repositories.totalCount)
            list = repos
                .filter(function (r) {
                    total += r.stargazers.totalCount
                    if (r.stargazers.totalCount >= thresh) {
                        return true
                    }
                })
                .sort(function (a, b) {
                    return b.stargazers.totalCount - a.stargazers.totalCount
                })

        if (list.length > limit) {
            list = list.slice(0, limit)
        }
        console.log(list)
        
        // console.log(list)
        callback(list)
    }

}

getGithubStars(github_username, github_threshhold, function(list){

    
    val = list.map( r => {
        currval =   '<li>' + 
                    '<a href="' + r.url + '">' + r.name + '</a>' + 
                    '<span>' + r.primaryLanguage.name+ ', ' + r.stargazers.totalCount + ' star ' + '</span>' + 
                    '<br>' + r.description + 
                    '</li>'
        // console.log('currval', currval)
        return currval
    }).join(' ')
    val = '<ul class="entry">' + val + '</ul>'
    $('#mygithub .gitlist').html(val)
    
})
	
