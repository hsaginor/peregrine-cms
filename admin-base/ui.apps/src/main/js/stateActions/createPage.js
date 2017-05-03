import { LoggerFactory } from '../logger'
let log = LoggerFactory.logger('createPage').setLevelDebug()

import {set} from '../utils'

export default function(me, target) {

    log.fine(target)
    var api = me.getApi()
    return api.createPage(target.parent, target.name, target.template)

}