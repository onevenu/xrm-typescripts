/// <reference path="../typings/xrm/xrm.d.ts"/>
class CommonMethods {
    static doUserHasRole(inputRole: string): boolean {

        let currentUserId: string = Xrm.Page.context.getUserId().replace(/[{}]/g, '');
        let currentUser: any = Service.Retrieve("systemusers",currentUserId,"_businessunitid_value,systemuserid");
        let currentUserBuId: string = currentUser._businessunitid_value;

        let userCurrentRoles: string[] = Xrm.Page.context.getUserRoles();

        inputRole = inputRole != "" ? inputRole.replace(/&/g, '%26') : "";

        let role: any = Service.RetrieveMultiple("roles",
            "_businessunitid_value,name,roleid",
            "name eq '" + inputRole + "' and  _businessunitid_value eq " + currentUserBuId);

        let inputRoleId: string = role != undefined && role.length > 0 ? role[0].roleid : "";
        let flag: number = 0;

        userCurrentRoles.forEach(element => {
            if (element == inputRoleId)
                flag++;
        });
        if (flag == 0)
            return false;
        else
            return true;
    }
}