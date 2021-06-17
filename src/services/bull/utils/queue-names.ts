export let QUEUE_NAME= {
    'SEND_EMAIL_HIGH_PRIORITY':'SEND_EMAIL_HIGH_PRIRITY',
    'SEND_ALERT_HIGH_PRIORITY':'SEND_ALERT_HIGH_PRIORITY',
    'SEND_EMAIL_LOW_PRIORITY':'SEND_EMAIL_LOW_PRIORITY',
    'SEND_ALERT_LOW_PRIORITY':'SEND_ALERT_LOW_PRIORITY'
}
export type QUEUE_TYPE = 'SEND_EMAIL_HIGH_PRIORITY'
                        |'SEND_ALERT_HIGH_PRIORITY'
                        |'SEND_EMAIL_LOW_PRIORITY'
                        |'SEND_ALERT_LOW_PRIORITY'
export const QUEUES:queue[]=[
    {
        queue_name:QUEUE_NAME.SEND_EMAIL_HIGH_PRIORITY,
        queue_priority:1
    },
    {
        queue_name:QUEUE_NAME.SEND_ALERT_LOW_PRIORITY,
        queue_priority:3
    },
    {
        queue_name:QUEUE_NAME.SEND_ALERT_HIGH_PRIORITY,
        queue_priority:3
    },
    {
        queue_name:QUEUE_NAME.SEND_EMAIL_LOW_PRIORITY,
        queue_priority:1
    }
]
export interface queue{
    queue_name:string,
    queue_priority:number;
}
export type PartialRecord<K extends string | number | symbol, T> = { [P in K]?: T; };