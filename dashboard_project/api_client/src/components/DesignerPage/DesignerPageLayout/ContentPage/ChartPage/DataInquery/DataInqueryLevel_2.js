import React, {Component} from "react";
import Select, {components} from "react-select";
import Button from '@material-ui/core/Button';
import tableList from "../tableList.js";
import chartList from "../chartList.js";
import './dataInqueryLevel_2.css';
import { connect } from "react-redux";

const ValueContainer = ({ children, getValue, ...props }) => {
    let maxToShow = 2;
    var length = getValue().length;
    let displayChips = React.Children.toArray(children).slice(0, maxToShow);
    let shouldBadgeShow = length > maxToShow;
    let displayLength = length - maxToShow;
  
    return (
        <components.ValueContainer {...props}>
            {!props.selectProps.inputValue && displayChips}
            <div>
                {shouldBadgeShow &&`+ ${displayLength} item${length != 1 ? "s" : ""} selected`}
            </div>
        </components.ValueContainer>
    );
};

const sendData = (data) => {
    return {
      type: 'From_DataInqueryLevel_2',
      data: data
    }
};

{/*
    This component has the same function to the first inquery component, and if the database table selected from the first inquery has any associated tables, this component will display these tables first in the selection option.
*/}

class DataInqueryLevel_2 extends Component{
    constructor(props){
        super(props);

        this.state = {

            Level: 2,

            Level_2_table_optionsList: null,

            Level_2_table_selectedOption: {value: tableList[0].name, label: tableList[0].name},
            Level_2_chart_selectedOption: {value: chartList[0].name, label: chartList[0].name},

            Level_2_firstAxis_selectedOption: null,
            Level_2_secondAxis_selectedOption: null,
            Level_2_thirdAxis_selectedOption: null,

            Level_2_firstAxis_enable: true,
            Level_2_secondAxis_enable: true,
            Level_2_thirdAxis_enable: true,

            Level_2_firstAxis_multiple: false,
            Level_2_secondAxis_multiple: false,
            Level_2_thirdAxis_multiple: false,

            Level_2_firstAxis_list: null,
            Level_2_secondAxis_list: null,
            Level_2_thirdAxis_list: null,
        }

        this.handleChange_Level_2_table = this.handleChange_Level_2_table.bind(this);
        this.handleChange_Level_2_chart = this.handleChange_Level_2_chart.bind(this);

        this.handleChange_Level_2_firstAxis = this.handleChange_Level_2_firstAxis.bind(this);
        this.handleOptions_Level_2_firstAxis = this.handleOptions_Level_2_firstAxis.bind(this);

        this.handleChange_Level_2_secondAxis = this.handleChange_Level_2_secondAxis.bind(this);
        this.handleOptions_Level_2_secondAxis = this.handleOptions_Level_2_secondAxis.bind(this);

        this.handleChange_Level_2_thirdAxis = this.handleChange_Level_2_thirdAxis.bind(this);
        this.handleOptions_Level_2_thirdAxis = this.handleOptions_Level_2_thirdAxis.bind(this);

        this.handleAxisState_to_initial = this.handleAxisState_to_initial.bind(this);

        this.handleOptions_Level_2_firstAxis_initial = this.handleOptions_Level_2_firstAxis_initial.bind(this);
        this.handleOptions_Level_2_secondAxis_initial = this.handleOptions_Level_2_secondAxis_initial.bind(this);
        this.handleOptions_Level_2_thirdAxis_initial = this.handleOptions_Level_2_thirdAxis_initial.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);
    }

    static getDerivedStateFromProps(nextProps, prevState){
		const {data} = nextProps;

        if(data !== prevState.data && data !== null){
            return{
                Level_2_table_optionsList: data,
            };
    	} 
    	return null
    }

    handleAxisState_to_initial(){
        this.setState({
            Level_2_firstAxis_enable: true,
            Level_2_secondAxis_enable: true,
            Level_2_thirdAxis_enable: true,

            Level_2_firstAxis_multiple: false,
            Level_2_secondAxis_multiple: false,
            Level_2_thirdAxis_multiple: false,

            Level_2_firstAxis_list: null,
            Level_2_secondAxis_list: null,
            Level_2_thirdAxis_list: null,
        });
    }

    handleOptions_Level_2_firstAxis_initial(){
        if("first_axis" in chartList[0]){
            this.setState({Level_2_firstAxis_enable:true});
            if(chartList[0].first_axis_num === "multiple"){
                this.setState({Level_2_firstAxis_multiple:true});
            }else{
                this.setState({Level_2_firstAxis_multiple:false});
            }

            var firstAxisList = [];
            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartFirstAxis = chartList[0].first_axis;
    
            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartFirstAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartFirstAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            firstAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            firstAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_firstAxis_list: firstAxisList});
        }else{
            this.setState({Level_2_firstAxis_enable:false});
            this.setState({Level_2_firstAxis_list: null});
        }
    }

    handleOptions_Level_2_secondAxis_initial(){
        if("second_axis" in chartList[0]){
            this.setState({Level_2_secondAxis_enable:true});
            if(chartList[0].second_axis_num === "multiple"){
                this.setState({Level_2_secondAxis_multiple:true});
            }else{
                this.setState({Level_2_secondAxis_multiple:false});
            }

            var secondAxisList = [];
            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartSecondAxis = chartList[0].second_axis;
    
            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartSecondAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartSecondAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            secondAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            secondAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_secondAxis_list: secondAxisList});
        }else{
            this.setState({Level_2_secondAxis_enable:false});
            this.setState({Level_2_secondAxis_list: null});
        }
    }

    handleOptions_Level_2_thirdAxis_initial(){
        if("third_axis" in chartList[0]){
            this.setState({Level_2_thirdAxis_enable:true});
            if(chartList[0].third_axis_num === "multiple"){
                this.setState({Level_2_thirdAxis_multiple:true});
            }else{
                this.setState({Level_2_thirdAxis_multiple:false});
            }

            var thirdAxisList = [];
            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartThirdAxis = chartList[0].third_axis;
    
            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartThirdAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartThirdAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            thirdAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            thirdAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_thirdAxis_list: thirdAxisList});
        }else{
            this.setState({Level_2_thirdAxis_enable:false});
            this.setState({Level_2_thirdAxis_list: null});
        }
    }

    handleOptions_Level_2_firstAxis(){
        var res = chartList.find(e => e.name === this.state.Level_2_chart_selectedOption.value);
        if (res == null){
            alert("Can not find the selected chart type");
            this.setState({Level_2_firstAxis_list: null});
        }else if("first_axis" in res){
            var firstAxisList = [];

            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartFirstAxis = chartList.find(e => e.name == this.state.Level_2_chart_selectedOption.value).first_axis;

            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartFirstAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartFirstAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            firstAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            firstAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_firstAxis_list: firstAxisList});
        }else{
            //alert("Can not find the first axis");
            this.setState({Level_2_firstAxis_list: null});
        }
    }

    handleOptions_Level_2_secondAxis(){
        var res = chartList.find(e => e.name === this.state.Level_2_chart_selectedOption.value);
        if (res == null){
            alert("Can not find the selected chart type");
            this.setState({Level_2_secondAxis_list: null});
        }else if("second_axis" in res){
            var secondAxisList = [];

            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartSecondAxis = chartList.find(e => e.name == this.state.Level_2_chart_selectedOption.value).second_axis;

            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartSecondAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartSecondAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            secondAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            secondAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_secondAxis_list: secondAxisList});
        }else{
            //alert("Can not find the second axis");
            this.setState({Level_2_secondAxis_list: null});
        }
    }

    handleOptions_Level_2_thirdAxis(){
        var res = chartList.find(e => e.name === this.state.Level_2_chart_selectedOption.value);
        if (res == null){
            alert("Can not find the selected chart type");
            this.setState({Level_2_thirdAxis_list: null});
        }else if("third_axis" in res){
            var thirdAxisList = [];

            var selectedTableCol = tableList.find(e => e.name == this.state.Level_2_table_selectedOption.value).columns;
            var selectedChartThirdAxis = chartList.find(e => e.name == this.state.Level_2_chart_selectedOption.value).third_axis;

            for(var i=0; i<selectedTableCol.length; i++){
                for(var j=0; j<selectedChartThirdAxis.length; j++){
                    if(selectedTableCol[i].type == selectedChartThirdAxis[j]){
                        if("reference" in selectedTableCol[i]){
                            var str= selectedTableCol[i].name + " (" + selectedTableCol[i].reference + ")";
                            thirdAxisList.push({value: selectedTableCol[i].name, label: str, disabled:true});
                        }else{
                            thirdAxisList.push({value: selectedTableCol[i].name, label: selectedTableCol[i].name});
                        }
                        break;
                    }
                }
            }
            this.setState({Level_2_thirdAxis_list: thirdAxisList});
        }else{
            //alert("Can not find the third axis");
            this.setState({Level_2_thirdAxis_list: null});
        }
    }
    
    handleChange_Level_2_table(Level_2_table_selectedOption){
        this.setState({Level_2_table_selectedOption},()=>{
            this.handleOptions_Level_2_firstAxis();
            this.handleOptions_Level_2_secondAxis();
            this.handleOptions_Level_2_thirdAxis();

            this.setState({Level_2_firstAxis_selectedOption:null});
            this.setState({Level_2_secondAxis_selectedOption:null});
            this.setState({Level_2_thirdAxis_selectedOption:null});
        });
    }

    handleChange_Level_2_chart(Level_2_chart_selectedOption){
        this.handleAxisState_to_initial();
        var res;
        this.setState({Level_2_chart_selectedOption},()=>{
            res = chartList.find(e => e.name === this.state.Level_2_chart_selectedOption.value)

            if (res == null){
                alert("Can not find the selected chart type")
            }else{
                if("first_axis" in res){
                    this.setState({Level_2_firstAxis_enable:true});
                    if(res.first_axis_num === "multiple"){
                        this.setState({Level_2_firstAxis_multiple:true});
                    }else{
                        this.setState({Level_2_firstAxis_multiple:false});
                    }
                }else{
                    this.setState({Level_2_firstAxis_enable:false});
                }
    
                if("second_axis" in res){
                    this.setState({Level_2_secondAxis_enable:true});
                    if(res.second_axis_num === "multiple"){
                        this.setState({Level_2_secondAxis_multiple:true});
                    }else{
                        this.setState({Level_2_secondAxis_multiple:false});
                    }
                }else{
                    this.setState({Level_2_secondAxis_enable:false});
                }
    
                if("third_axis" in res){
                    this.setState({Level_2_thirdAxis_enable:true});
                    if(res.third_axis_num === "multiple"){
                        this.setState({Level_2_thirdAxis_multiple:true});
                    }else{
                        this.setState({Level_2_thirdAxis_multiple:false});
                    }
                }else{
                    this.setState({Level_2_thirdAxis_enable:false});
                }
            }

            this.handleOptions_Level_2_firstAxis();
            this.handleOptions_Level_2_secondAxis();
            this.handleOptions_Level_2_thirdAxis();
        });

        this.setState({Level_2_firstAxis_selectedOption:null});
        this.setState({Level_2_secondAxis_selectedOption:null});
        this.setState({Level_2_thirdAxis_selectedOption:null});
    }

    handleChange_Level_2_firstAxis(Level_2_firstAxis_selectedOption){
        this.setState({Level_2_firstAxis_selectedOption});
    }

    handleChange_Level_2_secondAxis(Level_2_secondAxis_selectedOption){
        this.setState({Level_2_secondAxis_selectedOption});
    }

    handleChange_Level_2_thirdAxis(Level_2_thirdAxis_selectedOption){
        this.setState({Level_2_thirdAxis_selectedOption});
    }

    handleSubmit(event){
        event.preventDefault();

        if(this.state.Level_2_firstAxis_enable == true && (this.state.Level_2_firstAxis_selectedOption == null || this.state.Level_2_firstAxis_selectedOption.length == 0)){
            alert("Level 2 first axis is not selected")
            return
        }

        if(this.state.Level_2_secondAxis_enable == true && (this.state.Level_2_secondAxis_selectedOption == null || this.state.Level_2_secondAxis_selectedOption.length == 0)){
            alert("Level 2 second axis is not selected")
            return
        }

        if(this.state.Level_2_thirdAxis_enable == true && (this.state.Level_2_thirdAxis_selectedOption == null || this.state.Level_2_thirdAxis_selectedOption.length == 0)){
            alert("Level 2 third axis is not selected")
            return
        }

        var firstAxis_selectedOption = null;
        var secondAxis_selectedOption = null;
        var thirdAxis_selectedOption = null;

        if(this.state.Level_2_firstAxis_selectedOption != null){
            if(this.state.Level_2_firstAxis_multiple == false){
                firstAxis_selectedOption = [this.state.Level_2_firstAxis_selectedOption.value]
            }else{
                var arr=[]
                for(let i in this.state.Level_2_firstAxis_selectedOption){
                    arr.push(this.state.Level_2_firstAxis_selectedOption[i].value)
                }
                firstAxis_selectedOption = arr
            }
            
        }

        if(this.state.Level_2_secondAxis_selectedOption != null){
            if(this.state.Level_2_secondAxis_multiple == false){
                secondAxis_selectedOption = [this.state.Level_2_secondAxis_selectedOption.value]
            }else{
                var arr=[]
                for(let i in this.state.Level_2_secondAxis_selectedOption){
                    arr.push(this.state.Level_2_secondAxis_selectedOption[i].value)
                }
                secondAxis_selectedOption = arr
            }
        }

        if(this.state.Level_2_thirdAxis_selectedOption != null){
            if(this.state.Level_2_thirdAxis_multiple == false){
                thirdAxis_selectedOption = [this.state.Level_2_thirdAxis_selectedOption.value]
            }else{
                var arr=[]
                for(let i in this.state.Level_2_thirdAxis_selectedOption){
                    arr.push(this.state.Level_2_thirdAxis_selectedOption[i].value)
                }
                thirdAxis_selectedOption = arr
            }
        }

        console.log(firstAxis_selectedOption)
        console.log(secondAxis_selectedOption)
        console.log(thirdAxis_selectedOption)

        const requestOptions = {
            method: "POST",
            headers: {"Content-Type": "application/json", "Accept":"application/json"},
            body: JSON.stringify({
                level: this.state.Level,
                table_selectedOption: this.state.Level_2_table_selectedOption.value,
                chart_selectedOption: this.state.Level_2_chart_selectedOption.value,
                firstAxis_selectedOption: firstAxis_selectedOption,
                secondAxis_selectedOption: secondAxis_selectedOption,
                thirdAxis_selectedOption: thirdAxis_selectedOption,
            }),
        }

        if(this.state.Level_2_table_selectedOption.value == "api_server_cellmodel"){
            fetch("/api_server/cell", requestOptions).then((response) => response.json()).then((data) => {
                //this.state.data = data
                this.props.sendDataAction(data)
                console.log(data.firstAxisList)
                console.log(data.secondAxisList)
                console.log(data.thirdAxisList)
            })
        }

        if(this.state.Level_2_table_selectedOption.value == "api_server_unitmodel"){
            fetch("/api_server/unit", requestOptions).then((response) => response.json()).then((data) => {
                //this.state.data = data
                this.props.sendDataAction(data)
                console.log(data.firstAxisList)
                console.log(data.secondAxisList)
                console.log(data.thirdAxisList)
            })
        }

        if(this.state.Level_2_table_selectedOption.value == "api_server_wafermodel"){
            fetch("/api_server/wafer", requestOptions).then((response) => response.json()).then((data) => {
                //this.state.data = data
                this.props.sendDataAction(data)
                console.log(data.firstAxisList)
                console.log(data.secondAxisList)
                console.log(data.thirdAxisList)
            })
        }
    }

    componentDidMount(){
        this.handleOptions_Level_2_firstAxis_initial();
        this.handleOptions_Level_2_secondAxis_initial();
        this.handleOptions_Level_2_thirdAxis_initial();
    }

    render(){
        return(
            <div className="data-inquery">
                <form className="data-inquery-form" onSubmit={this.handleSubmit}>
                    <div style={{display:"inline-block", margin:"5px"}}>
                        <span style={{fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginLeft: "10px"}}>
                            Choose a data table first:
                        </span>
                        <Select
                            className="data-inquery-form-table-select"
                            defaultValue={this.state.Level_2_table_optionsList == null? {value: tableList[0].name, label: tableList[0].name}:this.state.Level_2_table_optionsList[0]}
                            value={this.state.Level_2_table_selectedOption}
                            isSearchable="true"
                            name="tableList"
                            placeholder="None Selected"
                            onChange={this.handleChange_Level_2_table}
                            options={this.state.Level_2_table_optionsList == null? tableList.map(e=>({value: e.name, label: e.name})): this.state.Level_2_table_optionsList }
                            isOptionDisabled={(option) => option.disabled}
                        />
                    </div>
                    <div style={{display:"inline-block", margin:"5px"}}>
                        <span style={{fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginLeft: "10px"}}>
                            Then choose a chart type:
                        </span>
                        <Select
                            className="data-inquery-form-chart-select"
                            defaultValue={{value: chartList[0].name, label: chartList[0].name}}
                            value={this.state.Level_2_chart_selectedOption}
                            isSearchable="true"
                            name="chartList"
                            placeholder="None Selected"
                            onChange={this.handleChange_Level_2_chart}
                            options={chartList.map(e=>({value: e.name, label: e.name}))}
                        />
                    </div>
                    <div style={{display:"inline-block", margin:"5px"}}>
                        <span style={{fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginLeft: "10px"}}>
                            Select the 1st axis (x):
                        </span>
                        <Select
                            className="data-inquery-form-first-axis-select"
                            defaultValue={{value: "Select 1st axis", label: "Select 1st axis"}}
                            value={this.state.Level_2_firstAxis_selectedOption}
                            isDisabled={!this.state.Level_2_firstAxis_enable}
                            isMulti={this.state.Level_2_firstAxis_multiple}
                            isSearchable="true"
                            name="firstAxisList"
                            placeholder="None Selected"
                            onChange={this.handleChange_Level_2_firstAxis}
                            components={{ ValueContainer }}
                            options={this.state.Level_2_firstAxis_list}
                            isOptionDisabled={(option) => option.disabled}
                        />
                    </div>
                    <div style={{display:"inline-block", margin:"5px"}}>
                        <span style={{fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginLeft: "10px"}}>
                            Select the 2nd axis (y):
                        </span>
                        <Select
                            className="data-inquery-form-second-axis-select"
                            defaultValue={{value: "Select 2nd axis", label: "Select 2nd axis"}}
                            value={this.state.Level_2_secondAxis_selectedOption}
                            isDisabled={!this.state.Level_2_secondAxis_enable}
                            isMulti={this.state.Level_2_secondAxis_multiple}
                            isSearchable="true"
                            name="secondAxisList"
                            placeholder="None Selected"
                            onChange={this.handleChange_Level_2_secondAxis}
                            components={{ ValueContainer }}
                            options={this.state.Level_2_secondAxis_list}
                            isOptionDisabled={(option) => option.disabled}
                        />
                    </div>
                    <div style={{display:"inline-block", margin:"5px"}}>
                        <span style={{fontStyle: "italic", fontSize: "14px", fontWeight: "bold", marginLeft: "10px"}}>
                            Select the 3rd axis (z):
                        </span>
                        <Select
                            className="data-inquery-form-third-axis-select"
                            defaultValue={{value: "Select 3rd axis", label: "Select 3rd axis"}}
                            value={this.state.Level_2_thirdAxis_selectedOption}
                            isDisabled={!this.state.Level_2_thirdAxis_enable}
                            isMulti={this.state.Level_2_thirdAxis_multiple}
                            isSearchable="true"
                            name="thirdAxisList"
                            placeholder="None Selected"
                            onChange={this.handleChange_Level_2_thirdAxis}
                            components={{ ValueContainer }}
                            options={this.state.Level_2_thirdAxis_list}
                            isOptionDisabled={(option) => option.disabled}
                        />
                    </div>
                    <div style={{display:"inline-block", margin:"5px", position:"relative"}}>
                        <Button 
                            className="data-inquery-form-submit" 
                            size="medium" 
                            variant="contained" 
                            type="submit" 
                            value="submit"
                            style={{
                                marginTop:"-5px",
                            }}
                            onSubmit = {this.handleSubmit}
                        >
                            Submit
                        </Button>
                    </div>
                </form>
            </div>
        ); 
    }
}

const mapDispatchToProps = (dispatch) => {
    return{
        sendDataAction: (data) => {dispatch(sendData(data))}
    };
};

export default connect(null, mapDispatchToProps)(DataInqueryLevel_2);
