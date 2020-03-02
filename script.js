window.addEventListener('load',()=>{
	var long;
	var lat;
	var tempDescription = document.querySelector('.temp-description');
	var degreeSection = document.querySelector('.degree-section');
	var tempDegree = document.querySelector('.temp-degree');
	var locationTimezone = document.querySelector('.location-timezone');
	const tempSpan = document.querySelector('.degree-section span');
	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position=>{
		  long = position.coords.longitude;
		  lat = position.coords.latitude;
		  const proxy = 'https://cors-anywhere.herokuapp.com/'
		  const api = `${proxy}https://api.darksky.net/forecast/4b01e50d03333ddc69606268ac49652b/${lat},${long}`;
		  	fetch(api).then(response=>{
			return response.json();
		}).then(data=>{
			locationTimezone.textContent = data.timezone.replace(/_/," ");
			tempDegree.textContent = data.currently.temperature;
			tempDescription.textContent = data.currently.summary;
			setIcons(data.currently.icon,document.querySelector('.icon'));

			//change temp to celsius
			degreeSection.addEventListener('click',()=>{
				if(tempSpan.textContent==="°F")
					{
						var C = changeToCelsius(data.currently.temperature);
						tempDegree.textContent = C.toFixed(2);
						tempSpan.textContent = "°C";
					}
				else
				{
					tempDegree.textContent = data.currently.temperature;
					tempSpan.textContent = "°F";
				}

			});
		});
		});


	}
	function setIcons(icon,iconID){
		const skycons = new Skycons({ color:"white" });
		const currentIcon = icon.replace(/-/g,"_").toUpperCase();
		skycons.play();
		return skycons.set(iconID,Skycons[currentIcon]);
	}
	function changeToCelsius(F)
	{ 
		return (5/9)*(F-32);
	}
});
