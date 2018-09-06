web: bundle exec puma -t 5:5 -p ${PORT:-3000} -e ${RACK_ENV:-development}
relay: yarn run relay -- --watch
webpacker: ./bin/webpack-dev-server
