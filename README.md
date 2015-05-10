# Racha

<a href="http://www.youtube.com/watch?feature=player_embedded&v=tbTbYRefGWc" target="_blank"><img src="https://raw.githubusercontent.com/josephmilla/racha/master/racha.png" 
alt="IMAGE ALT TEXT HERE" width="240" height="180" border="10" /></a>

## Setup 

### Intialize MongoDB database
```
$ cd racha
$ mkdir data
$ cd data
$ mkdir db
$ mongod --dbpath db
```

### Download dependencies
```
$ npm install
$ bower install
```

### Build and run server
```
$ grunt build
$ grunt serve
/* Default: locahost:9000 */
```

© 2015 Joseph Milla
