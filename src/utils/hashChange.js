module.exports = {
    render() {
        // this.setTitle()
        const self = this
        window.addEventListener('load', () => {
            self.setTitle()
            self.setNav()
        })
        window.addEventListener('hashchange',  () => {
            self.setTitle()
            self.setNav()
        })
    },

    setTitle() {
        const hash = location.hash.slice(1);
        const match = {
            '/home': ['首页', '用户信息'],
            '/position': ['职位管理', '列表'],
            '/position_add':['职位管理', '添加']
        }
        $('#title').find('span').html(match[hash][0])
        $('#title').find('small').html(match[hash][1])
    },

    setNav() {
        let hash = location.hash;
        const reg = /^#\/position+/
        if(reg.test(hash)) {
            hash = '#/position'
        }
        const $a = $(`ul.sidebar-menu a[href='${hash}']`);
        $a.parent().addClass('active treeview').siblings().removeClass('active treeview')
    }
}