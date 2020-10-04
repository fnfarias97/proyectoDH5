const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => console.log('Server running in 3030 port'));

app.get('/', (req,res) =>{
	let myFile = path.resolve('./views/index.html');
	res.sendFile(myFile);
});

app.get('/detalle', (req,res) =>{
	let myFile = path.resolve('./views/productDetail.html');
	res.sendFile(myFile);
});

app.get('/carrito', (req,res) =>{
	let myFile = path.resolve('./views/productCart.html');
	res.sendFile(myFile);
});

app.get('/register', (req,res) =>{
	let myFile = path.resolve('./views/register.html');
	res.sendFile(myFile);
});

app.get('/login', (req,res) =>{
	let myFile = path.resolve('./views/login.html');
	res.sendFile(myFile);
});

app.get('*', (req,res) =>{
	if (req.url.includes('.')) {
		let myFile = path.resolve('public' + req.url);
		return res.sendFile(myFile);
	}
	res.send('Not Found');
});