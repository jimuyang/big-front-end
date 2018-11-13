import React from 'react';
import { Row, Col } from 'antd';
import GGEditor, { Flow } from 'gg-editor';

import EditorMinimap from '../../components/EditorMinimap';
import EditorItemPanel from '../../components/EditorItemPanel';
import { FlowDetailPanel } from '../../components/EditorDetailPanel';
import { FlowContextMenu } from '../../components/EditorContextMenu';
import { FlowToolbar } from '../../components/EditorToolbar';

import styles from './index.module.scss';

class FlowPage extends React.Component {
    renderFlow() {
        return (
            <Flow className={styles.flow} />
        );
    }

    render() {
        console.log(styles);
        return (
            <GGEditor className={styles.editor}>
                <Row type="flex" className={styles['editor-hd']}>
                    <Col span={24}>
                        <FlowToolbar />
                    </Col>
                </Row>
                <Row type="flex" className={styles['editor-bd']}>
                    <Col span={4} className={styles['editor-sidebar']}>
                        <EditorItemPanel />
                    </Col>
                    <Col span={16} className={styles['editor-content']}>
                        {this.renderFlow()}
                    </Col>
                    <Col span={4} className={styles['editor-sidebar']}>
                        <FlowDetailPanel />
                        <EditorMinimap />
                    </Col>
                </Row>
                <FlowContextMenu />
            </GGEditor>
        );
    }
}

export default FlowPage;



