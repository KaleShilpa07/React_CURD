import React, { useEffect, useState } from 'react'

console.log(useEffect);
export  function TextForm(props) {

    const [test, SetTest] = useState("");
    const HandleUpClick = () => {
        let newtext = test.toUpperCase();
        SetTest(newtext)
        props.showAlert("   Uppercase is done !!", "Success");
        // document.title='Uppercase Data'
    }
    const HandleLoClick = () => {
        let newtext = test.toLowerCase();
        SetTest(newtext)
        props.showAlert("   Lowercase is done !!", "Success");
        // document.title='Lowercase Data'
    }
    const HandleCrClick = () => {
        let newtext = "";
        SetTest(newtext)
        props.showAlert("  Clear Data !!", "Success");
        //document.title='Clear Data'
    }
    const HandleRemoveExtraSpaceClick = () => {
        let newtext = test.split(/[ ]+/);
        SetTest(newtext.join(" "))
        props.showAlert("   Extra Spaces removed ..", "Success");
        // document.title='Removed Spaces'

    }
    const HandleCopyClick = () => {
        // let newtext=document.getElementById("Box1");
        // newtext.select();
        // navigator.clipboard.writeText(newtext.value);
        //  document.getSelection().removeAllRanges();
        navigator.clipboard.writeText(test);
        props.showAlert("     Copied to clipboard..", "Success");
        //document.title='Copy clipboard'
    }
    const HandleOnChange = (event) => {
        SetTest(event.target.value);//  event.target.value Is used update new value in text area 
    }

    return (
        <>
            <div className="container" style={{ padding: "30px" }}>
                <h1 ><u>Text Editor</u> </h1>
                <div className="mb-4">
                    <strong> <label className="form-label">Upper ,Lower Word counter,character counter,count time,remove extra spaces.</label></strong>
                    <textarea className="form-control" style={{ backgroundColor: props.mode === 'dark' ? 'grey' : 'white', border: '2px solid', width:"600px" }} value={test} id="Box1" onChange={HandleOnChange} rows="5"></textarea>
                </div>
                <button disabled={test.length === 0} className="btn btn-primary mx-1 my-1" onClick={HandleLoClick}>Lower case</button>
                <button disabled={test.length === 0} className="btn btn-primary mx-1 my-1" onClick={HandleCrClick}>Clear</button>
                <button disabled={test.length === 0} className="btn btn-primary mx-1 my-1" onClick={HandleCopyClick}>Copy</button>
                <button disabled={test.length === 0} className="btn btn-primary mx-1 my-1" onClick={HandleRemoveExtraSpaceClick}>Remove Space</button>
                <button disabled={test.length === 0} className="btn btn-primary mx-1 my-1" onClick={HandleUpClick}>Upper case</button>
            </div>
            <div className="container my-3" >
                <h2>Yours Note Summary..</h2>
                <p>{test.split(/\s+/).filter((element) => { return element.length !== 0 }).length} Words And {test.length} Characters</p>
                {/* Count words in a paragraph and find length in para */}
                <p>{0.008 * test.split(" ").filter((element) => { return element.length !== 0 }).length} Minutes. </p>
                <h2>Paragraph Preview </h2>
                <p id="p1">{test.length > 0 ? test : "Nothing to preview.."}</p>
            </div>
        </>
    )
}
export default TextForm;