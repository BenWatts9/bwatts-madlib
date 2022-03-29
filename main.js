console.log("You look marvelous!");

//story
// It had been a hard, {adjective} day on the {silly word} trail. The cowboys drove a herd of {plural noun} across the dry plains, kicking up {noun} along the way as they looked for somewhere to bed down.


const mainElement = document.querySelector("main");

mainElement.addEventListener("click", event => {
	if(event.target.id.startsWith("tellStory")){
		const adjective = document.querySelector("input[name='adjective']").value
		const sillyword = document.querySelector("input[name='silly__word']").value
		const pluralnoun = document.querySelector("input[name='plural__noun']").value
		const noun = document.querySelector("input[name='noun']").value
		
		const madlib = {
			adjective: adjective,
			sillyword: sillyword,
			pluralnoun: pluralnoun,
			noun: noun
		}
		
		//set/save to sessionStorage
		setDataToStorage(madlib)
		//invoke renderStory
		renderStory()
	}
})

const getDataFromStorage = (dataKey) => {
	//use JSON.parse()
	const data = JSON.parse(sessionStorage.getItem(dataKey))
	return data
}

const setDataToStorage = (dataObj) => {
	//use JSON.stringify()
	sessionStorage.setItem('madlib', JSON.stringify(dataObj))
}

const clearStorage = (dataKey) => {
	sessionStorage.removeItem(dataKey);
}

const renderInputs = () => {
	clearStorage('madlib')
	// show inputs fields
	mainElement.innerHTML = `
		<input type="text" name="adjective" placeholder="Adjective"> 
		<input type="text" name="silly__word" placeholder="Silly Word"> 
		<input type="text" name="plural__noun" placeholder="Plural Noun"> 
		<input type="text" name="noun" placeholder="Noun"> 
		`
	//show 'Tell Story' button
	mainElement.innerHTML += `
		<button type="button" id="tellStory">Tell Story</button
		`
}

const renderStory = () => {
	//get from sessionStorage
	const storyObj = getDataFromStorage("madlib")
	//show the story
	mainElement.innerHTML += `It had been a hard, ${storyObj.adjective} day on the ${storyObj.sillyword} trail. The cowboys drove a herd of ${storyObj.pluralnoun} across the dry plains, kicking up ${storyObj.noun} along the way as they looked for somewhere to bed down.`
	//show startOver button
	mainElement.innerHTML += `<button type="button" id="start__over">Start Over</button>`
	//startOver will invoke renderInputs()
	mainElement.addEventListener("click", event => {
		if(event.target.id.startsWith("start__over")){
			renderInputs()
		}
	})
}

renderInputs();
