# -*- coding: utf-8 -*-

import sae.const


sae.const.MYSQL_DB      # 数据库名
sae.const.MYSQL_USER    # 用户名
sae.const.MYSQL_PASS    # 密码
sae.const.MYSQL_HOST    # 主库域名（可读写）
sae.const.MYSQL_PORT    # 端口，类型为<type 'str'>，请根据框架要求自行转换为int
sae.const.MYSQL_HOST_S  # 从库域名（只读）


db_config = {
    'host': sae.const.MYSQL_HOST,
    'port': sae.const.MYSQL_PORT,
    'user': sae.const.MYSQL_USER,
    'passwd': sae.const.MYSQL_PASS,
    'db':sae.const.MYSQL_DB,
    'charset':'utf8'
}

local_config = {
    'host': 'localhost',
    'port': 3306,
    'user': 'root',
    'passwd': 'root',
    'db':'pythontest',
    'charset':'utf8'
}

dbinfo = 'mysql://%s:%s@%s:%s/%s?charset=%s'%(db_config['user'],
                                              db_config['passwd'],
                                              db_config['host'],
                                              db_config['port'],
                                              db_config['db'],
                                              db_config['charset'])

localinfo = 'mysql://%s:%s@%s:%s/%s?charset=%s'%(local_config['user'],
                                                 local_config['passwd'],
                                                 local_config['host'],
                                                 local_config['port'],
                                                 local_config['db'],
                                                 local_config['charset'])
