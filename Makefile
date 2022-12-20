# PORT_NUM := $(shell lsof -i | grep 8739 | awk -F ' ' '{print $$2}')

#deploy: FORCE
# ifneq ($(PORT_NUM),)
# 	kill -9 $(PORT_NUM)
# endif
#	cp app.js /home/test/space/front-deploy
#	npm run build
#	rm -rf /home/test/space/front-deploy/dist
#	mv dist /home/test/space/front-deploy
#	cd /home/test/space/front-deploy;node app.js &

PROD_DIR = /Users/wangyi/Documents/PersonalFile/Git/deploy/space/back

deploy: FORCE
	npm run build
	rm -rf $(PROD_DIR)/dist
	mv dist $(PROD_DIR)

FORCE:

