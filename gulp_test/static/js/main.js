alert('hello world');
console.log('nihao');
function collee(n){
	if(n < 0) {
		return 1;
	}
	return collee(n-1) + collee(n-2);
}
collee(10);
collee(11);
collee(12);
collee(13);