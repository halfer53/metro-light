

function getGithubStars(user, limit, callback){

    var thresh = 1
    var per_page = 100
    var page = 1
    var repos = []
    var res_count = 0

    request( geturl(user, page) , handlecb)

    function handlecb(res){
        if (!res) {
            console.log(res.message)
            return
        }
        res_count = res.length
        repos = repos.concat(res)

        if(res_count == per_page){
            request(geturl( user, ++page), handlecb)
        }else{
            output(repos)
        }
    }

    function geturl(user, i){
        return 'https://api.github.com' + '/users/' + user + '/repos?per_page=' + per_page + '&page=' + i.toString()
    }

    function request (mypath, cb) {
        var body = ''
        var result = ''
        url =  mypath
        console.log('request', url)
        $.when( $.ajax(url) ).then(function(data, textStatus, jqXHR){
            console.log(data)
            cb(data)
        }, function(data, textStatus, jqXHR){
            console.log(textStatus, data)
        })
    }
    
    function output (repos) {
        var total = 0,
            longest = 0,
            list = repos
                .filter(function (r) {
                    total += r.stargazers_count
                    if (r.stargazers_count >= thresh) {
                        if (r.name.length > longest) {
                            longest = r.name.length
                        }
                        return true
                    }
                })
                .sort(function (a, b) {
                    return b.stargazers_count - a.stargazers_count
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
    var val = list.map( r => {
        currval =   '<li>' + 
                    '<a href="' + r.html_url + '">' + r.name + '</a>' + 
                    '<span>' + r.language + ', ' + r.stargazers_count + ' star ' + '</span>' + 
                    '<br>' + r.description + 
                    '</li>'
        // console.log('currval', currval)
        return currval
    }).join(' ')
    val = '<ul class="entry">' + val + '</ul>'
    $('#mygithub .gitlist').html(val)
})
	
