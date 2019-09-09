const Concat = array => {
	if (array.length > 15) {
		let newarray = array.substring(0, 15);
		newarray += ' ...';
		return newarray;
	} else {
		return array;
	}
};
export default Concat;
