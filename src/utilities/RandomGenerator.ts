const RandomGenerator = () => {
    let tempList = [];
    for (let i = 0; i < 10; i++){
        tempList.push(Math.floor(Math.random() * 50) + 1);
    }
    return tempList;
}

export default RandomGenerator;