Vagrant.configure(2) do |config|
    config.vm.box = "ubuntu/xenial64"
    config.vm.provider "virtualbox" do |v|
        v.memory = 1024
        v.cpus = 2
        v.name = "v-mongo"
    end
    config.vm.network "forwarded_port", guest: 27017, host: 27017
    config.vm.provision :shell, path: "mongo-setup.sh"
    
    config.vm.synced_folder "prova", "/home/ubuntu/host"
    end