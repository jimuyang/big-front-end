import React from 'react';
import { Card } from 'antd';
import { ItemPanel, Item } from 'gg-editor';
import styles from './index.module.scss';

class EditorItemPanel extends React.Component {
    render() {
        console.log(styles);
        return (
            <ItemPanel className={styles['item-panel']}>
                <Card bordered={false} className={styles['ant-card-body']}>
                    <Item
                        type="node"
                        size="72*72"
                        shape="flow-circle"
                        model={{
                            color: '#fa8c16',
                            label: '起止节点'
                        }} src="https://gw.alipayobjects.com/zos/rmsportal/ZnPxbVjKYADMYxkTQXRi.svg"
                    />
                    <Item
                        type="node"
                        size="80*48"
                        shape="flow-rect"
                        model={{
                            color: '#1890FF',
                            label: '常规节点',
                        }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/wHcJakkCXDrUUlNkNzSy.svg"
                    />
                    <Item
                        type="node"
                        size="80*72"
                        shape="flow-rhombus"
                        model={{
                            color: '#13C2C2',
                            label: '分叉节点',
                        }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/SnWIktArriZRWdGCnGfK.svg"
                    />
                    <Item
                        type="node"
                        size="80*48"
                        shape="flow-capsule"
                        model={{
                            color: '#722ED1',
                            label: '模型节点',
                        }}
                        src="https://gw.alipayobjects.com/zos/rmsportal/rQMUhHHSqwYsPwjXxcfP.svg"
                    />
                </Card>
            </ItemPanel>
        );
    }
}
export default EditorItemPanel;
