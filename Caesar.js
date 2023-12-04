let fs=require('fs')
let s=fs.readFileSync('textx.txt');
s=s.toString();
s=s.toLowerCase();
let l=s.length;

let alph=['а','б','в','г','д','е','ё','ж','з','и','й','к','л','м','н','о','п','р','с','т','у','ф','х','ц','ч','ш','щ','ъ','ы','ь','э','ю','я'];

let new_s="";

let alph_freq=fs.readFileSync('alph.txt');
alph_freq=alph_freq.toString();
alph_freq=alph_freq.split('\r\n');
for(let i=0;i<33;i++){
	alph_freq[i]=Number(alph_freq[i]);
}

for(let i=0;i<l-1;i++){
	if(alph.indexOf(s[i]) != -1){
		new_s+=alph[(alph.indexOf(s[i])+2)%33];
	}
	else{new_s+=s[i]}
}

fs.writeFile("encrypted.txt", new_s,function(error){
    if(error) throw error;
});

alph2_freq=new Array();


for (let i=0;i<33;i++){
	let cnt=0;
	for(let j=0;j<l-1;j++){
		if(alph[i]==new_s[j]){
			cnt+=1;
		}
	}
	let ch=cnt/l;
	alph2_freq[i]=ch;
}


let b=0;
let results=new Array();
for(b;b<33;b++){
	let f=0;
	for(let i=0;i<33;i++){
		f+=(alph_freq[i]-alph2_freq[(i+b)%33])**2;
	}
	results.push(f);
}
b=results.indexOf(Math.min.apply(null, results));

let res="";

for(let i=0;i<l-1;i++){
	if(alph.indexOf(new_s[i])!=-1){
		res+=alph[(33+(alph.indexOf(new_s[i])-b))%33]
	}
	else{res+=new_s[i];}
}
console.log(s)
console.log(new_s)
console.log(res)