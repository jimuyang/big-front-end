/**
 * 这是页面的model示例对象
 */

var computed_attributes = [
    {
        'expression': 'input.red == true',
        'description': '是红的',
    },
    {
        'expression': 'input.purple == true',
        'description': '是紫的',
    },
    {
        'expression': 'input.size',
        'description': '尺码',
    },
    {
        'expression': 'input.price',
        'description': '价格',
    },
    {
        'expression': '["毛衣","棉袄"].includes(input.type)',
        'description': '适合冬天穿',
    }
]

var nodes = [
    // nodes[0]
    {
        'id': 'start-001',
        'type': 'start',
        'state': 'start',
    },
    // nodes[1]
    {
        'id': 'if-001',
        'type': 'if',
        'conditions': [
            {
                'defined': ['红的', '为真'],
                'expression': 'input.red == true',
                'description': '是红的'
            },
            {
                'defined': ['紫的', '为真'],
                'expression': 'input.purple == true',
                'description': '是紫的'
            }
        ],
        'state': '红的或紫的'
    },
    // nodes[2]
    {
        'id': 'if-002',
        'type': 'if',
        'conditions': [
            {
                'defined': ['适合冬天穿'],
                'expression': '["毛衣","棉袄"].includes(input.type)',
                'description': '适合冬天穿'
            }
        ],
        'return': '买给奶奶的'
    },
    // nodes[3]
    {
        'id': 'other-001',
        'type': 'other',
        'return': '买给妈妈的'
    },
    // nodes[4]
    {
        'id': 'oter-002',
        'type': 'other',
        'state': 'other'
    },
    // nodes[5]
    {
        'id': 'if-003',
        'type': 'if',
        'conditions': [
            {
                'defined': ['尺码', '大于', '20'],
                'expression': 'input.size > 20',
                'description': '尺码偏大'
            }
        ],
        'return': '买给爸爸的'
    },
    // nodes[6]
    {
        'id': 'if-004',
        'type': 'if',
        'conditions': [
            {
                'defined': ['尺码', '小于等于', '10'],
                'expression': 'input.size <= 10',
                'description': '尺码偏小'
            }
        ],
        'return': '买给弟弟的',
    },
    // nodes[7]
    {
        'id': 'other-003',
        'type': 'other',
        'state': 'other'
    },
    // nodes[8]
    {
        'id': 'if-005',
        'type': 'if',
        'conditions': [
            {
                'defined': ['价格', '大于', '500'],
                'expression': 'input.price > 500',
                'description': '贵了'
            }
        ],
        'return': '不买了'
    },
    // nodes[9]
    {
        'id': 'other-004',
        'type': 'other',
        'return': '买给自己的'
    }
]

var Node = function (type) {
    this.type = type;
}

/**
 * 二叉树中的节点 
 * @param {Node} node 
 * @param {Node} firstChild 
 * @param {Node} nextSibling 
 */
var TreeNode = function (node, firstChild, nextSibling) {
    this.node = node;
    this.firstChild = firstChild;
    this.nextSibling = nextSibling;
}

/**
 * 访问BTree节点，生成表达式
 */
TreeNode.prototype.toExpression = function () {
    var node = this.node;
    if (!node) {
        return '';
    }

    var expression = '';
    switch (node.type) {
        case 'start':
            return 'console.log("start");';
        case 'if':
            var conditions = node.conditions || [];
            if (conditions && conditions.length > 0) {
                expression += 'if(';
                // expression += conditions.join(' || ');
                var expressions = [];
                for (var i = 0; i < conditions.length; i++) {
                    expressions.push(conditions[i].expression);
                }
                // console.log(expressions);
                expression += expressions.join('||');
                expression += ')';
            } else {
                console.log('if组件有问题');
                return '';
            }
            if (node.return) {
                expression += ('{return "' + node.return + '";}');
            }
            break;
        case 'other':
            if (node.return) {
                expression += ('{return "' + node.return + '";}');
            }
            break;
        default:
            break;
    }
    return expression;

}

/**
 * 给树中节点添加孩子
 */
TreeNode.prototype.addChild = function (treeNode) {
    if (!this.firstChild) {
        this.firstChild = treeNode;
        return this;
    }
    var child = this.firstChild;
    while (child.nextSibling) {
        child = child.nextSibling;
    }
    child.nextSibling = treeNode;
    return this;
}

/**
 * 获取树节点的子节点数组
 */
TreeNode.prototype.childs = function () {
    var childs = [];
    if (!this.firstChild) {
        return [];
    }
    var child = this.firstChild;
    childs.push(child);
    while (child.nextSibling) {
        child = child.nextSibling;
        childs.push(child);
    }
    return childs;
}


/**
 * 建造一棵mock树
 */
function buildBTree() {
    var root = new TreeNode(nodes[0]);
    root.addChild(new TreeNode(nodes[1]))
        .addChild(new TreeNode(nodes[4]));
    root.firstChild.addChild(new TreeNode(nodes[2]))
        .addChild(new TreeNode(nodes[3]));
    root.firstChild.nextSibling.addChild(new TreeNode(nodes[5]))
        .addChild(new TreeNode(nodes[6]))
        .addChild(new TreeNode(nodes[7]));
    root.firstChild.nextSibling.firstChild.nextSibling.nextSibling
        .addChild(new TreeNode(nodes[8]))
        .addChild(new TreeNode(nodes[9]));
    return root;
}
console.log(JSON.stringify(buildBTree()));

/**
 * 遍历成A{B{D;E}C{F;G;H{I;J}}} 的格式
 */
function travelTree(treeNode, str) {
    str = str || '';
    if (treeNode && treeNode.node) {
        // str += (treeNode.node.return || treeNode.node.state);
        str += treeNode.toExpression();
        var childs = treeNode.childs();
        if (childs && childs.length > 0) {
            str += '{';
            for (var i = 0; i < childs.length; i++) {
                str = travelTree(childs[i], str);
            }
            str += '}';
        }
    }
    return str;
}

console.log(travelTree(buildBTree()));
var input = {
    'red': false,
    'purple': false,
    'size': 15,
    'price': 100,
    'type': 'T'
}

var rule = new Function('input', travelTree(buildBTree()));
console.log(rule(input));


