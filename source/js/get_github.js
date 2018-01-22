

function getGithubStars(user, limit, callback){

    thresh = 1;
    limit = 3;
    user = 'halfer53';

    request('/users/' + user, function (res) {
        if (!res.public_repos) {
            console.log(res.message)
            return
        }
        var result = ''
        var pages = Math.ceil(res.public_repos / 100),
            i = pages,
            repos = []
        while (i--) {
            request('/users/' + user + '/repos?per_page=100&page=' + (i + 1), function(res){
                repos = repos.concat(res)
                pages--
                if (!pages){
                    output(repos);
                }
            }.bind({result:result}))
        }
    })

    function request (mypath, cb) {
        var body = ''
        var result = ''
        url = 'https://api.github.com' + mypath
        $.when( $.ajax(url) ).then(function(data, textStatus, jqXHR){
            // console.log(data)
            cb(data)
        }, function(data, textStatus, jqXHR){
            console.log('err', data)
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
    console.log(github_username)
    var val = list.map( r => {
        currval =   '<li>' + 
                    '<a href="' + r.html_url + '">' + r.name + '</a>' + 
                    '<span>' + r.language + ', ' + r.stargazers_count + ' star ' + '</span>' + 
                    '<br>' + r.description + 
                    '</li>'
        console.log('currval', currval)
        return currval
    }).join(' ')
    val = '<ul class="entry">' + val + '</ul>'
    $('#mygithub .gitlist').html(val)
})
	
