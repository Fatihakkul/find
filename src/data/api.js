const API = {
   // base_url : "https://wherismykid.herokuapp.com/api",
    base_url : "https://findmyfamily.app/api",
    get_family : "/children/getfamily",
    signupsignin : "/auth/signupsignin",
    addChild : "/parent/addchildren",
    getCode : "/parent/getcode",
    updateLocation : "/parent/updatelocationchildren",
    deleteLocation : "/parent/deletelocationchildren",
    getLocation : "/parent/getlocationchildren",
    createLocation : "/parent/setuplocationchildren",
    get_message : "/home/getmessages",
    add_content : "http://yatoo.demeli.org/api/addcontent",
    update_user : "/updateuser",
    get_user : "/home/getuser",
    getmessage_limit : "/home/getmessageslimit",
    location_history : "/parent/getlocation",
    push_notification_child : "/children/pushnotificationlocation",
    get_children_area_notifications : "/parent/getparentnotification"
}
export default API
