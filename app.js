const express = require('express');
const path = require('path');
const app = express();

app.listen(3030, () => console.log('Server running in 3030 port'));

app.get('/', (req,res) =>{
	let myFile = path.resolve('./views/index.html');
	res.sendFile(myFile);
});

app.get('/productDetail', (req,res) =>{
	let myFile = path.resolve('./views/productDetail.html');
	res.sendFile(myFile);
});

app.get('/productCart', (req,res) =>{
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

app.get('/contacto', (req,res) =>{
	let myFile = path.resolve('./views/contacto.html');
	res.sendFile(myFile);
});

app.get('*', (req,res) =>{
	if (req.url.includes('.')) {
		let myFile = path.resolve('public' + req.url);
		return res.sendFile(myFile);
	}
	res.send('Not Found');
});