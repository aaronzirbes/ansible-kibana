# Generated by Ansible for {{ansible_fqdn}}
description "Kibana Upstart"

start on docker
stop on runlevel [!2345]

respawn

setuid root
setgid root

script

  . /usr/local/bin/read_userdata.sh

  /usr/bin/docker run -d \
    --name kibana \
    -h `cat /etc/hostname` \
    --restart="always" \
    --rm \
    -e ELASTICSEARCH=http://${user_data_esDomain}:9200 \
    {{kibana_docker_opts}} \
    {{kibana_container}}:{{kibana_version}}
end script

pre-stop script
  /usr/bin/docker stop kibana
end script
