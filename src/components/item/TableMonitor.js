import React from "react";
import { Table, Popconfirm, Button } from "antd";
// import _ from "lodash";

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      [
        {
          title: "Recipient",
          dataIndex: "name"
        },
        {
          title: "Timestamp",
          dataIndex: "username"
        },
        {
          title: "Description",
          dataIndex: "email"
        },
        {
          title: " ",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#f7e9e9",
                    color: "#c02428"
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : null
        }
      ],
      [
        {
          title: "abc",
          dataIndex: "email",
          width: "30%"
        },
        {
          title: "xyz",
          dataIndex: "username"
        },
        {
          title: "123",
          dataIndex: "email"
        },
        {
          title: "operation",
          dataIndex: "operation",
          render: (text, record) =>
            this.state.dataSource.length >= 1 ? (
              <Popconfirm
                title="Sure to delete?"
                onConfirm={() => this.handleDelete(record.id)}
              >
                <Button
                  style={{
                    borderRadius: 16,
                    backgroundColor: "#f7e9e9",
                    color: "#c02428"
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            ) : null
        }
      ]
    ];
    this.state = {
      dataSource: [],
      update: 0,
      columns: [],
      selectedRowKeys: []
    };
  }

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.id !== id)
    });
  };
  onSelectChange = selectedRowKeys => {
    console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys });
  };

  render() {
    if (this.state.update < 2) {
      this.state.dataSource = this.props[0];
      this.state.update += 1;
      this.state.columns = this.columns[this.props.type];
    }
    const { dataSource } = this.state;
    const columns = this.state.columns.map(col => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          //  dataIndex: col.dataIndex,
          title: col.title
        })
      };
    });
    const { selectedRowKeys } = this.state;
    const rowSelection = {
      selectedRowKeys,
      onChange: this.onSelectChange
    };
    const data = dataSource.map(e => {
      return {
        key: e["id"],
        ...e  
      };
    });
    console.log(data, "data");
    this.state.dataSource = data;
    console.log(dataSource, 'dataSource');
    
    const hasSelected = selectedRowKeys.length > 0;
    return (
      <div>
        <Button
          disabled={!hasSelected}
          style={{
            borderRadius: 16,
            backgroundColor: "#f7e9e9",
            color: "#c02428",
            marginBottom: "20"
          }}
        >
          Remove Selected
        </Button>
        <Table
          rowClassName={() => "editable-row"}
          // bordered
          dataSource={dataSource}
          columns={columns}
          rowSelection={rowSelection}
        />
      </div>
    );
  }
}