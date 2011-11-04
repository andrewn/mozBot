import bpy, os

# FILE TO EXPORT TO
curName = os.path.basename(bpy.data.filepath);
curName = curName.replace('.blend','');
fileName = os.path.dirname(bpy.data.filepath)+'/'+curName+'.js'
import bpy

# CREATE THE SHIP!
text = 'var '+curName+' = function(pick){\n'
text = text+'	\n'
text = text+'	var scope = this;\n'
text = text+'	\n'
text = text+'	scope.scale = 10;\n'
text = text+'	\n'
text = text+'	scope.settings = new Array();\n'
text = text+'	\n'
text = text+'	THREE.Geometry.call(this);\n\n'

# MAKE A LIST OF PARTS (MESHES)
text = text+'	// Let\'s create a fresh list of parts\n'
text = text+'	scope.parts = new Array();\n'
text = text+'	scope.connectors = new Array();\n\n'

partCount = 0;

# LOOP THROUGH THE PARTS
for ob in bpy.data.groups['parts'].objects:
	
	if ob.type == 'MESH':
		
		text = text + '	// Let\'s start a fresh new part\n'
		text = text + '	part = new Object();\n'
		
		
		text = text + '	part.name = \''+ob.name+'\';\n'
		text = text + '	part.id = '+str(partCount)+';\n'
		partCount += 1;		
				
		
		# VERTICES
		text = text + '	part.vertices = ['
		
		for i, v in enumerate(ob.data.vertices):
			
			if i:
				co = ','
			else:
				co = ''
				
			co = co +'['+str(round((v.co[0]*10),3))+','+str(round((v.co[1]*10),3))+','+str(round((v.co[2]*10),3))+']'
			
			text = text+co
			
		text = text+'];\n'
		
		
		# FACES
		
		text = text+'	part.faces = ['
			
		for i, f in enumerate(ob.data.faces):
			
			if i:
				fa = ','
			else:
				fa = ''
			
			v = f.vertices
			try:
				fa = fa+'['+str(v[0])+','+str(v[1])+','+str(v[2])+','+str(v[3])+']'
			except:
				fa = fa+'['+str(v[0])+','+str(v[1])+','+str(v[2])+']'
							
			text = text+fa
			
		text = text +'];\n\n';
		text = text +'	scope.parts[part.name] = part;\n\n'		
		
		# MAKE THE CONNECTOR FOR THIS OBJECT
		l = ob.location
		q = ob.rotation_quaternion

		o = '	c = new Object();\n'
		o = o+'	c.name = part.name;\n'
		o = o+'	c.position = ['+str(round((l[0]*10),3))+','+str(round((l[1]*10),3))+','+str(round((l[2]*10),3))+'];\n'
		o = o+'	c.quaternion = ['+str(round(q[1],6))+','+str(round(q[2],6))+','+str(round(q[3],6))+','+str(round(q[0],6))+'];\n'
		o = o+'	scope.connectors[part.name] = c;\n\n'

		text = text+o


#FINISH THE TEXT
text = text+'	\n'
text = text+'	items = scope.parts\n'
text = text+'	\n'
text = text+'	if(pick === undefined){\n'
text = text+'		scope.pick = Math.round(partRand.getRandomNumber() * (items.length - 1));\n'
text = text+'	}else{\n'
text = text+'		scope.pick = pick;\n'
text = text+'	}\n'
text = text+'	\n'
text = text+'	scope.part = items[scope.pick];\n'
text = text+'	\n'
text = text+'	for (var i = 0; i < scope.part.vertices.length; i ++ ){\n'
text = text+'		v(scope.part.vertices[i]);\n'
text = text+'	}\n'
text = text+'	\n'
text = text+'	for (var i = 0; i < scope.part.faces.length; i ++ ){\n'
text = text+'		face = scope.part.faces[i];\n'
text = text+'		if(face.length == 4){\n'
text = text+'			f4(face);\n'
text = text+'		}else{\n'
text = text+'			f3(face);\n'
text = text+'		}\n'
text = text+'	}\n'
text = text+'	\n'
text = text+'	this.computeCentroids();\n'
text = text+'	this.computeFaceNormals();\n'
text = text+'	\n'
text = text+'	function v(co){\n'
text = text+'		scope.vertices.push( new THREE.Vertex( new THREE.Vector3(co[0],co[1],co[2])));\n'
text = text+'	}\n'
text = text+'	function f3(v){\n'
text = text+'		scope.faces.push( new THREE.Face3(v[0],v[1],v[2]));\n'
text = text+'	}\n'
text = text+'	function f4(v){\n'
text = text+'		scope.faces.push( new THREE.Face4(v[0],v[1],v[2],v[3]));\n'
text = text+'	}\n'
text = text+'	\n'
text = text+'};\n'
text = text+'\n'
text = text+curName+'.prototype = new THREE.Geometry();\n'
text = text+curName+'.prototype.constructor = '+curName+';\n'
	
file = open(fileName, "w")
file.write(text)
file.close()