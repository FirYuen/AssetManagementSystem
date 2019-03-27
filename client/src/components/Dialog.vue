<template>
    <div class="dialog">
<el-dialog
    :title="dialog.title"
    :visible.sync="dialog.show"
    width="30%"
    :append-to-body="false"
    @close="console.log('close')"
    
    >
    
    <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="console.log('confore')">确 定</el-button>
    </span>
</el-dialog>

    </div>
</template>

<script>
export default {
name:"Dialog",
data(){
    return {
        dialogVisible:true
    }
},
props:{
    dialog:Object
}
}
</script>

<style>

</style>
