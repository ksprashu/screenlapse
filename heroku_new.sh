echo "running heroku scripts"
git init
heroku create
heroku config:add BUILDPACK_URL=https://github.com/ddollar/heroku-buildpack-multi.git
heroku config:add LD_LIBRARY_PATH=/usr/local/lib:/usr/lib:/lib:/app/vendor/phantomjs/lib
heroku config:add PATH=/usr/local/bin:/usr/bin:/bin:/app/vendor/phantomjs/bin
git add --all
git commit -m 'initial commit'
git push heroku master
heroku ps:scale worker=1
