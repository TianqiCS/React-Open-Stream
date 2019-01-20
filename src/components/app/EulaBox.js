import React, { Component } from 'react';
import {Alert, Icon} from "antd";
import {eula, eulaZh} from "../../utils/eula";


/**
 * EulaBox contain eula information of both English and Chinese version
 * @see Alert {@link https://ant.design/components/alert/}
 * @see pre for preserves both spaces and line breaks {@link https://developer.mozilla.org/en-US/docs/Web/HTML/Element/pre}
 * @param {function} changeLang -  change the state to rerender
 * @param {boolean} zh - use Chinese or not
 * @version 1.0.0
 * @author TianqiCS
 */

class EulaBox extends  Component {
    render() {
        return (
            <Alert
                message={
                    <div>
                        <Icon type="global"
                              style={{color: "red"}}
                              onClick={this.props.changeLang}/>  {/*Change language*/}
                        中/英
                        <pre>{this.props.zh ? eulaZh: eula}</pre>
                    </div>
                }
                type="success"
            />
        );
    }
}

export default EulaBox