import React from 'react';
import 'antd/dist/antd.css';
import {Form, Layout, InputNumber, Button, Space, Select, List, Divider, Row, Col} from 'antd';

import {splitNumber, testDistribution} from 'split-number-to-sum-components';

const {Header, Footer, Content} = Layout;
const {Option} = Select;

class App extends React.Component {
	state = {
		numberOfSoldiers: 55,
		numberOfInvocations: 100,
		unitTypes: [],
		distributedTroops: [],
		distributionItems: []
	};

	initializeUnitTypes = () => {
		const unitTypes = ['Spearmen', 'Swordsmen', 'Archers']
		const children = [];
		for (let i = 0; i < unitTypes.length; i++) {
			children.push(<Option key={unitTypes[i]}>{unitTypes[i]}</Option>);
		}
		return children;
	}

	handleNumberOfSoldiersChange = (value) => {
		this.setState({numberOfSoldiers: value});
	}

	handleNumberOfInvocationsChange = (value) => {
		this.setState({numberOfInvocations: value});
	}

	handleUnitTypeChange = (value) => {
		this.setState({...this.state, unitTypes: value});
	}

	generateRandomTroops = () => {
		if (this.state.numberOfSoldiers > this.state.unitTypes.length) {
			const army = splitNumber(this.state.numberOfSoldiers, this.state.unitTypes.length);
			const randomArmy = Object.assign.apply({}, this.state.unitTypes.map((v, i) => ({[v]: army[i]})));
			this.setState({
				...this.state,
				distributedTroops: [...this.state.distributedTroops, ...[JSON.stringify(randomArmy)]]
			});
			return;
		}
		this.setState({...this.state, distributedTroops: [...this.state.distributedTroops, "Error"]});
		this.render();
	}

	testRandomTroopsDistribution = () => {
		if (this.state.numberOfSoldiers > this.state.unitTypes.length && this.state.numberOfInvocations > 1) {
			const distributionMap = testDistribution(this.state.numberOfSoldiers, this.state.unitTypes.length, this.state.numberOfInvocations);
			let items = [];
			for (let key in distributionMap) {
				items.push(key + " - " + distributionMap[key]);
			}
			this.setState({
				...this.state,
				distributionItems: items
			});
			return;
		}
		this.setState({...this.state, distributedTroops: [...this.state.distributedTroops, "Error"]});
		this.render();
	}

	clearOutput = () => {
		this.setState({...this.state, distributedTroops: []});
	}

	render() {

		return (
			<Layout>
				<Header style={{backgroundColor: '#f0f2f5'}}/>
				<Content style={{padding: '0 50px'}}>
					<Row>
						<Col span={12}>
							<Form layout={"horizontal"}>
								<Divider orientation="left">Generate Army</Divider>
								<Form.Item label="Number of soldiers">
									<InputNumber min={1} value={this.state.numberOfSoldiers}
									             onChange={this.handleNumberOfSoldiersChange}/>
								</Form.Item>
								<Form.Item label="Unit types">
									<Select mode="tags" style={{width: '50%'}} placeholder="Unit types"
									        onChange={this.handleUnitTypeChange}>
										{this.initializeUnitTypes()}
									</Select>
								</Form.Item>
								<Form.Item>
									<Divider orientation="left">Actions</Divider>
									<Space>
										<Button type="primary" shape="round" size={'default'} onClick={this.generateRandomTroops}>Generate
											army</Button>
										<Button type="primary" shape="round" size={'default'} onClick={this.clearOutput}>Clear army</Button>
									</Space>
								</Form.Item>
								<Form.Item>
									<Divider orientation="left">Output</Divider>
									<List
										header={<div>Generated randomly distributed army troops</div>}
										bordered
										dataSource={this.state.distributedTroops}
										renderItem={item => (
											<List.Item>
												{item}
											</List.Item>
										)}
									/>
								</Form.Item>
							</Form>
						</Col>
						<Col span={12}>
							<Form layout={"horizontal"}>
								<Divider orientation="left">Test Distribution</Divider>
								<Form.Item/>
								<Form.Item label="Number of invocations">
									<InputNumber min={1} value={this.state.numberOfInvocations}
									             onChange={this.handleNumberOfInvocationsChange}/>
								</Form.Item>
								<Form.Item>
									<Divider orientation="left">Actions</Divider>
									<Space>
										<Button type="primary" shape="round" size={'default'} onClick={this.testRandomTroopsDistribution}>Test
											distribution</Button>
										<Button type="primary" shape="round" size={'default'}
										        onClick={() => this.setState({...this.state, distributionItems: []})}>Clear</Button>
									</Space>
								</Form.Item>
								<Form.Item>
									<Divider orientation="left">Output</Divider>
									<List
										header={<div>Test distribution</div>}
										bordered
										dataSource={this.state.distributionItems}
										renderItem={item => (
											<List.Item>
												{item}
											</List.Item>
										)}
									/>
								</Form.Item>
							</Form>
						</Col>
					</Row>
				</Content>
				<Footer/>
			</Layout>
		);
	}
}

export default App;
