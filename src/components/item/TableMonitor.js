import React, { useContext, useState, useEffect, useRef } from 'react';
import { Table, Input, Button, Popconfirm, Form } from 'antd';

export default class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
        [
            {
                title: 'name',
                dataIndex: 'name',
                width: '30%',
            },
            {
                title: 'age',
                dataIndex: 'username',
            },
            {
                title: 'address',
                dataIndex: 'email',
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) =>
                this.state.dataSource.length >= 1 ? (
                    <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                    <a>Delete</a>
                    </Popconfirm>
                ) : null,
            },
        ],
        [
          {
              title: 'abc',
              dataIndex: 'email',
              width: '30%',
          },
          {
              title: 'xyz',
              dataIndex: 'username',
          },
          {
              title: '123',
              dataIndex: 'email',
          },
          {
              title: 'operation',
              dataIndex: 'operation',
              render: (text, record) =>
              this.state.dataSource.length >= 1 ? (
                  <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                  <a>Delete</a>
                  </Popconfirm>
              ) : null,
          },
      ]
    ];
    this.state = {
      dataSource: [],
      update: 0,
      columns: []
    };
  }

  handleDelete = id => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter(item => item.id !== id),
    });
  };
  
  render() {
    if(this.state.update < 2){
    //    console.log('abc: ',this.props[0])
        this.state.dataSource = this.props[0]
        this.state.update +=1
        this.state.columns = this.columns[this.props.type]
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
          title: col.title,
        }),
      };
    });
    return (
      <div>
        <Table
          rowClassName={() => 'editable-row'}
          bordered
          dataSource={dataSource}
          columns={columns}
        />
      </div>
    );
  }
}