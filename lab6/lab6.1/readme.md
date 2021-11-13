# MyBusinessAPI

## Check Status of API

```
http://localhost:3000
```
## Check available items

```
POST http://localhost:3000/

{
    "url": "http://localhost:3000/checkItems"
}
```

## Check history

```
http://localhost:3000/history
```
# How to use? 

- Save `lab.com` as a local entry in hosts file
- Run git clone
- Navigate to cloned folder
- Run `docker build . -t lab6.1`
- Run `docker run -d -p 3000:3000 lab6.1`
- Open `http://lab.com:3000/`

# Other way? 

- Install nodejs & npm
- Run git clone
- Navigate to cloned folder
- Run `npm install`
- Run `node index.js`
- Open `http://lab.com:3000/`